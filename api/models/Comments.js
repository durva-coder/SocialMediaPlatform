// Comment Model

module.exports = {

    attributes: {
  
      message: {
        type: 'string'
      },
      // one to many association between user & comments
      user: {
        model: 'user',
        required: true
      },
      // one to many association between post & comments
      post: {
        model: 'post',
        required: true
      }
  
    },
  
  
  };
  
  