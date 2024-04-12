import { PartialType } from '@nestjs/mapped-types';
import { CreateReserveStatusDto } from './create-reserve_status.dto';

export class UpdateReserveStatusDto extends PartialType(CreateReserveStatusDto) {}
