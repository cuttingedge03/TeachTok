class ForYou {
    constructor(type, id, playlist, description, image, question, options, user) {
      this.type = type;
      this.id = id;
      this.playlist = playlist;
      this.description = description;
      this.image = image;
      this.question = question;
      this.options = options.map(option => ({ id: option.id, answer: option.answer }));
      this.user = { name: user.name, avatar: user.avatar };
    }
  
    static fromJSON(json) {
      return new ForYou(
        json.type,
        json.id,
        json.playlist,
        json.description,
        json.image,
        json.question,
        json.options,
        {
          name: json.user.name,
          avatar: json.user.avatar
        }
      );
    }
  }
  
  export default ForYou;
  