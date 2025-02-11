import vine from '@vinejs/vine'

export const CreateReactionValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    entity_id: vine.number(),
    entity_type: vine.string().in(['post', 'comment', 'reply']),
    reaction_type: vine.string().in(['like', 'love', 'haha', 'wow', 'sad', 'angry']),
  })
)
export const DeleteReactionValidator = vine.compile(
  vine.object({
    id: vine.number(),
    user_id: vine.number(),
  })
)
