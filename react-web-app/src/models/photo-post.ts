export interface PhotoPost{
    postId: number
    userId: number
    publicId: string
    title: string
    captions: string
    reactions: number
    albumId: number
    createdAt: string
    hasInteracted: boolean|null
}