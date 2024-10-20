import { User } from "./user";

export interface Blog{
    title: string;
    markdown: string;
    date: string;
    tags: string[];

}

export interface CreateBlog extends Blog{}
export interface UpdateBlog extends Blog{}
export interface PopulatedBlog extends Blog{
    _id: string;
    author: User;
}

