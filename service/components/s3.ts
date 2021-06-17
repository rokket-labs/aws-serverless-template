import { basename, extname } from 'path'

import { S3 } from 'aws-sdk'
import {
  GetObjectRequest,
  ListObjectsRequest,
  PutObjectRequest } from 'aws-sdk/clients/s3'
import mime from 'mime'
import slug from 'url-slug'
import { v4 as uuid } from 'uuid'

import config from '../configs/s3'

interface SignedUrlPutObjectRequest extends Omit<PutObjectRequest, 'Expires'> {
  /**
   * The amount of time in which the URL expires.
   */
  Expires: number;
}

interface SignedUrlGetObjectRequest extends Omit<GetObjectRequest, 'Expires'> {
  /**
   * The amount of time in which the URL expires.
   */
  Expires: number;
}

/**
 * @param {string} prefix The prefix to use.
 * @param {string} filename The original file name.
 *
 * @returns {Promise<string>} A promise to the upload URL.
 */
export const getSignedPutObjectUrl = (
  prefix: string,
  filename: string
): Promise<string> => {
  const s3 = new S3()
  const ext = extname(filename)
  const name = basename(filename, ext)
  const params: SignedUrlPutObjectRequest = {
    Key: `${prefix}/${uuid()}/${slug(name)}${ext}`,
    ContentType: mime.getType(filename),
    StorageClass: 'INTELLIGENT_TIERING',
    Expires: config.expires,
    Bucket: config.bucket
  }

  return s3.getSignedUrlPromise('putObject', params)
}

/**
 * @param {string} Key The object key to fetch.
 *
 * @returns {Promise} A promise to the object fetch URL.
 */
export const getSignedGetObjectUrl = (Key: string): Promise<string> => {
  const s3 = new S3()
  const params: SignedUrlGetObjectRequest = {
    Expires: config.expires,
    Bucket: config.bucket,
    Key
  }

  return s3.getSignedUrlPromise('getObject', params)
}

/**
 * @param {string} Key The object key to fetch.
 *
 * @returns {Promise} A promise to the delete object URL.
 */
export const getSignedDeleteObjectUrl = (Key: string): Promise<string> => {
  const s3 = new S3()
  const params: SignedUrlGetObjectRequest = {
    Expires: config.expires,
    Bucket: config.bucket,
    Key
  }

  return s3.getSignedUrlPromise('deleteObject', params)
}

/**
 * @param {string} Prefix The prefix to list objects for.
 *
 * @returns {Promise} A promise to the objects list.
 */
export const listObjects = (
  Prefix: string
): Promise<S3.ListObjectsV2Output> => {
  const s3 = new S3()
  const params: ListObjectsRequest = {
    Bucket: config.bucket,
    Prefix
  }

  return s3.listObjectsV2(params).promise()
}
