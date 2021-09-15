/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
      id
      name
      notes {
        items {
          id
          name
          body
          groupID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      id
      name
      notes {
        items {
          id
          name
          body
          groupID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      id
      name
      notes {
        items {
          id
          name
          body
          groupID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      id
      tag
      notes {
        items {
          id
          tagId
          noteId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
      id
      tag
      notes {
        items {
          id
          tagId
          noteId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      id
      tag
      notes {
        items {
          id
          tagId
          noteId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createTagNote = /* GraphQL */ `
  mutation CreateTagNote(
    $input: CreateTagNoteInput!
    $condition: ModelTagNoteConditionInput
  ) {
    createTagNote(input: $input, condition: $condition) {
      id
      tagId
      noteId
      tag {
        id
        tag
        notes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      note {
        id
        name
        body
        groupID
        group {
          id
          name
          createdAt
          updatedAt
          owner
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTagNote = /* GraphQL */ `
  mutation UpdateTagNote(
    $input: UpdateTagNoteInput!
    $condition: ModelTagNoteConditionInput
  ) {
    updateTagNote(input: $input, condition: $condition) {
      id
      tagId
      noteId
      tag {
        id
        tag
        notes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      note {
        id
        name
        body
        groupID
        group {
          id
          name
          createdAt
          updatedAt
          owner
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTagNote = /* GraphQL */ `
  mutation DeleteTagNote(
    $input: DeleteTagNoteInput!
    $condition: ModelTagNoteConditionInput
  ) {
    deleteTagNote(input: $input, condition: $condition) {
      id
      tagId
      noteId
      tag {
        id
        tag
        notes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      note {
        id
        name
        body
        groupID
        group {
          id
          name
          createdAt
          updatedAt
          owner
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      body
      groupID
      group {
        id
        name
        notes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tags {
        items {
          id
          tagId
          noteId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      body
      groupID
      group {
        id
        name
        notes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tags {
        items {
          id
          tagId
          noteId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      body
      groupID
      group {
        id
        name
        notes {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tags {
        items {
          id
          tagId
          noteId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
