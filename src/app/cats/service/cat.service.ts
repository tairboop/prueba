import { Inject, Injectable, NotFoundException, Res } from '@nestjs/common'
import { CreateCatDto, UpdateCatDto} from '../dto'
import { EntityManager, Repository } from 'typeorm'
import { Cat } from '../entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CatsRepository } from '../repository'
import { PaginationDto } from 'src/core/dto/pagination.dto'
import { Response as ExpressResponse } from 'express'
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from 'src/core/response'
import { Messages } from 'src/common/response-messages'


@Injectable()
export class CatsService {
  constructor(
    @Inject(CatsRepository)
    private catRepository: CatsRepository
  ) {}

  async create(createCatDto: CreateCatDto, file: Express.Multer.File){
    let imagePath: string | null = null;

    if (file) {
      const uploadPath = path.join(__dirname, '../../../../nfs')
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true })
      }

      const fileName = `${uuidv4().substring(0, 8)}-${file.originalname}`
      imagePath = path.join(uploadPath, fileName)
      fs.writeFileSync(imagePath, file.buffer)
    }
    const cat = {
      ...createCatDto,
      urlimg: imagePath,
      id_uuid: uuidv4()
    };

    const resp = await this.catRepository.create(cat)
    return ApiResponse.success(resp)
  }
  async findAll(paginationDto: PaginationDto){
    const resp= await this.catRepository.findAll(paginationDto)
    return ApiResponse.success(resp)
  }
  async findOne(id: number){
    const resp = await this.catRepository.findOne(id)
    return ApiResponse.success(resp)
  }

  async update(id: number, updateCatDto: UpdateCatDto, file: Express.Multer.File){
    let imagePath: string | null = null
    if (file) {
      const uploadPath = path.join(__dirname, '../../../../nfs')
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true })
      }
      const fileName = `${uuidv4().substring(0, 8)}-${file.originalname}`
      imagePath = path.join(uploadPath, fileName)
      fs.writeFileSync(imagePath, file.buffer)

      const existingCat = await this.catRepository.findOne(id)
      if (existingCat && existingCat.urlimg && fs.existsSync(existingCat.urlimg)) {//busca y elimina la imagen anterior
        fs.unlinkSync(existingCat.urlimg)
      }
    }

    const updateData = {
      ...updateCatDto,
      ...(imagePath && { urlimg: imagePath }), 
    };
    const resp = await this.catRepository.update(id, updateData)
    return ApiResponse.success(resp)
  }

  async remove(id: number){
    const resp = await this.catRepository.remove(id)
    return ApiResponse.success(resp)
  }

  async idImg(id: number, @Res() res: ExpressResponse): Promise<any> {
    const cat = await this.catRepository.findOne(id);
    if (!cat) {
        return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND);
    }
    const fileName = path.basename(cat.urlimg);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');   
    res.sendFile(path.resolve(cat.urlimg));
  }
}