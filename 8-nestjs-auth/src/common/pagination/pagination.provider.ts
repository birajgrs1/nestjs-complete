import { Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/pagination-query.dto';
import { Repository, ObjectLiteral, FindOptionsWhere } from 'typeorm';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    repository: Repository<T>,
    paginationDto: PaginationDto,
    where: FindOptionsWhere<T> = {},
  ): Promise<{
    data: T[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
    links: {
      first: string;
      previous: string | null;
      next: string | null;
      last: string;
    };
  }> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, totalItems] = await repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return this.buildPaginationResponse({ data, totalItems, page, limit });
  }

  public buildPaginationResponse<T>({
    data,
    totalItems,
    page,
    limit,
  }: {
    data: T[];
    totalItems: number;
    page: number;
    limit: number;
  }) {
    const totalPages = Math.ceil(totalItems / limit);
    const itemCount = data.length;

    const links = {
      first: `?page=1&limit=${limit}`,
      previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
      next: page < totalPages ? `?page=${page + 1}&limit=${limit}` : null,
      last: `?page=${totalPages}&limit=${limit}`,
    };

    return {
      data,
      meta: {
        totalItems,
        itemCount,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
      links,
    };
  }
}
