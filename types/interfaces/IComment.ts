export interface IComment {
  _id: string;
  postId: string;
  author: ICommentAuthor;
  text: string;
  replies?: IReply[];
}

export interface IReply {
  commentId: any;
  _id: string;
  author: ICommentAuthor;
  text: string;
}

export interface ICommentAuthor {
  email: string;
  name: string;
}

// create a comment interface
