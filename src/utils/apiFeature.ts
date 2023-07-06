import { request } from 'express';
import { Query } from 'mongoose';

export class APIFeature {
  query: Query<any, any>;
  queryString: typeof request.query;
  constructor(query: Query<any, any>, queryString: typeof request.query) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'limit', 'page', 'fields'];
    excludedFields.forEach((item: string) => delete queryObj[item]);

    const queryString = JSON.stringify(queryObj);

    const query = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(query));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.toString().split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }

    this.query = this.query.sort('-createAt');
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.toString().split(',').join(' ');
      console.log(fields);

      this.query = this.query.select(fields);
    } else this.query = this.query.select('-__v');
    return this;
  }
}
