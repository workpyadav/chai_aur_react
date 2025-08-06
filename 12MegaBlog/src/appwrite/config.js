import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    clint = new Client();
    databases;
    bucket;

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.clint);
        this.bucket = new Storage(this.clint);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            return post;
        } catch (error) {
            console.log("Appwrite service :: createPost error: ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            const post = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            return post;
        } catch (error) {
            console.log("Appwrite service :: updatePost error: ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost error: ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return post;
        } catch (error) {
            console.log("Appwrite service :: getPost error: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            return posts;
        } catch (error) {
            console.log("Appwrite service :: getPost error: ", error);
            return false;
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.log("Appwrite service :: uploadFile error: ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile error: ", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        const url = this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
        return url;
    }
}

const service = new Service();
export default service;