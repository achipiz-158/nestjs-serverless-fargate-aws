import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LikePublication, Publication, Tag } from 'src/my-world/entities';
import { Equal, FindOneOptions, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePublicationInput } from '../dto/publication/create-publication-input';
import { ProfileService } from 'src/profile/services';
import { Consultation } from 'src/shared/interface/consultation';
import { CreateLikePublicationInput } from '../dto/publication/create-like-publication.inputs';
import { UbicationPublicationInput } from '../dto/publication/ubication-publication.input';
import { Point } from 'geojson';
import { Follow } from 'src/profile/entities';
import { shuffle } from 'lodash'; 
import { Not } from 'typeorm';

@Injectable()
export class PublicationService {
  private readonly publicationRelations = [
    'media',
    'profile',
    'likesPublications',
    'comments',
    'tags',
  ];
  private readonly followRelations = [
    'follower',
    'follower.country',
    'followed.country',
    'followed',
    'tags',
  ];

  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    private readonly profileService: ProfileService,
    @InjectRepository(LikePublication)
    private readonly likePublicationRepository: Repository<LikePublication>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
  ) { }

  async find(filters: any) {
    return await this.publicationRepository.find({
      relations: this.publicationRelations,
      where: filters,
    });
  }

  async findOne(filters: Consultation) {
    return await this.publicationRepository.findOne(filters);
  }

  async findOneById(publication_id: string): Promise<Publication> {
    const foundPublication = await this.publicationRepository.findOne({
      where: { id: publication_id },
      relations: this.publicationRelations,
    });

    if (!foundPublication) {
      throw new HttpException(
        'Publicacion no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    foundPublication.numLikes = foundPublication.likesPublications.length;
    return foundPublication;
  }

  async findAll(): Promise<Publication[]> {
    const publicationsFound = await this.publicationRepository.find({
      relations: this.publicationRelations,
      order: {
        createdAt: 'DESC'
      }
     });

    if (publicationsFound.length === 0) {
      return [];
    }
  
    const lastPublication = publicationsFound[0]; 
    const remainingPublications = publicationsFound.slice(1); 
  
    const randomPublications = shuffle(remainingPublications); 
    randomPublications.unshift(lastPublication);
  
    const publicationsWithCounts = randomPublications.map((publication) => {
      publication.numLikes = publication.likesPublications.length;
      publication.numComments = publication.comments.length;
      return publication;
    });
  
    return publicationsWithCounts;
  }
  

  async findPublicationByUser(profile_id: string) {
    return await this.publicationRepository.find({
      where: { profile: { id: profile_id } },
      relations: this.publicationRelations,
    });
  }

  async createPublication(
    publicationData: CreatePublicationInput,
    authorId: string,
  ) {
    const newPublication = this.publicationRepository.create(publicationData);
    const author = await this.profileService.findOneById(authorId);
    newPublication.profile = author;
    const publicationSave = await this.publicationRepository.save(
      newPublication,
    );
    return publicationSave;
  }

  async likeDislikePub(
    like: CreateLikePublicationInput,
    profile_id,
  ): Promise<Publication> {
    const profileFound = await this.profileService.findOneById(profile_id);
    const publicationFound = await this.findOneById(like.publication_id);
    if (!profileFound.id) {
      throw new HttpException('Unauthorized', HttpStatus.BAD_REQUEST);
    }
    const foundLike = await this.likePublicationRepository.findOne({
      where: {
        profile_id: profile_id,
        publication_id: like.publication_id,
      },
    });
    like.profile_id = profile_id;
    if (foundLike) {
      this.likePublicationRepository.delete({ id: foundLike.id });
      publicationFound.numLikes = publicationFound.likesPublications.length;
      return publicationFound;
    }

    const createdLike = this.likePublicationRepository.create(like);
    await this.likePublicationRepository.save(createdLike);
    publicationFound.numLikes = publicationFound.likesPublications.length;
    return publicationFound;
  }

  async ubicationPublication(publication: UbicationPublicationInput) {
    const publicationToUpdate = await this.publicationRepository.findOne({
      where: { id: publication.publicationId },
    });
    if (!publicationToUpdate) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }
    const meetingPoint: Point = {
      type: 'Point',
      coordinates: [publication.latitud, publication.longitud],
    };
    this.publicationRepository.merge(publicationToUpdate, {
      ...publication,
      meetingPoint,
    });
    return await this.publicationRepository.save(publicationToUpdate);
  }

  async findFollowers(profile_id: string) {
    return await this.followRepository.find({
      where: { follower: { id: profile_id } },
      relations: this.followRelations,
    });
  }

  async findFollowersByQuery(profile_id: string, query: string): Promise<Follow[]> {
    const lowercaseQuery = query.toLowerCase();

    return await this.followRepository.find({
      where: [
        { follower: { id: profile_id }, followed: { name: ILike(`%${lowercaseQuery}%`) } },
        { follower: { id: profile_id }, followed: { profession: ILike(`%${lowercaseQuery}%`) } },
        { follower: { id: profile_id }, followed: { country: { name: ILike(`%${lowercaseQuery}%`) } } },
      ],
      relations: this.followRelations,
    });
  }

  async createTags(publicationId: string, followIds: string[]) {
    const newTags = [];
    for (const followId of followIds) {
      const followOptions: FindOneOptions<Follow> = {
        where: { id: Equal(followId) },
      };
      const followEntity = await this.followRepository.findOne(followOptions);
      if (!followEntity) {
        throw new Error(`Follow entity with followed ${followId} not found.`);
      }
      const newTag = this.tagRepository.create({
        publication: { id: publicationId },
        follow: followEntity,
      });
      const savedTag = await this.tagRepository.save(newTag);
      newTags.push(savedTag);
    }
    return newTags;
  }

  async deletePublication(publicationId: string): Promise<string> {
    let publication = await this.publicationRepository.findOne({
      where: { id: publicationId }
    });

    if (publication) {
      await this.publicationRepository.remove(publication);
      return "publication deleted";
    } else {
      throw new HttpException('publication not found', HttpStatus.NOT_FOUND);
    }
  }

}
