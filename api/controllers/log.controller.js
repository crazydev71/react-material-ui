import Log from '../models/log';

export const addLog = (user_id, action, action_key, action_data) => {
  new Log({
    user_id: user_id, 
    action: action, 
    action_key: action_key, 
    action_data: action_data
  }).save().then((model) => {
    if (model)
      return model.toJSON();
  });
}

export const getLogs = (req, res) => {
  const user = req.user.toJSON();
  Log.where('user_id', user.id).orderBy('created_at', 'DESC').fetchAll().then((model) => {
    return res.json(model.toJSON());
  })
}