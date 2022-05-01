import User from './user';

interface Comment {

    readonly comment: {

        readonly content: string
        readonly likes: string
        readonly date: string
        readonly commentID: string
        readonly percent: string

    }

    readonly user: User

    readonly level: string
}

export default Comment