class Following {
    constructor(type, id, playlist, flashcard_front, flashcard_back, description, user) {
      this.type = type;
      this.id = id;
      this.playlist = playlist;
      this.flashcard_front = flashcard_front;
      this.flashcard_back = flashcard_back;
      this.description = description;
      this.user = user;
    }
  
    static fromJSON(json) {
      return new Following(
        json.type,
        json.id,
        json.playlist,
        json.flashcard_front,
        json.flashcard_back,
        json.description,
        {
          name: json.user.name,
          avatar: json.user.avatar
        }
      );
    }
  }
  
  
  export default Following;