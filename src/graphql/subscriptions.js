/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup($owner: String!) {
    onCreateGroup(owner: $owner) {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup($owner: String!) {
    onUpdateGroup(owner: $owner) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup($owner: String!) {
    onDeleteGroup(owner: $owner) {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag($owner: String!) {
    onCreateTag(owner: $owner) {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag($owner: String!) {
    onUpdateTag(owner: $owner) {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag($owner: String!) {
    onDeleteTag(owner: $owner) {
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
export const onCreateTagNote = /* GraphQL */ `
  subscription OnCreateTagNote {
    onCreateTagNote {
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
export const onUpdateTagNote = /* GraphQL */ `
  subscription OnUpdateTagNote {
    onUpdateTagNote {
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
export const onDeleteTagNote = /* GraphQL */ `
  subscription OnDeleteTagNote {
    onDeleteTagNote {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($owner: String!) {
    onCreateNote(owner: $owner) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($owner: String!) {
    onUpdateNote(owner: $owner) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($owner: String!) {
    onDeleteNote(owner: $owner) {
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
