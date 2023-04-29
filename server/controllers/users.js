import User from "../models/User.js";

//READ
export const getUser = async(req, res) => {
  try{
    const {userId} = req.params;
    const user = await User.findById(userId); //grab the specific user
    res.status(200).json(user);

  }catch(error){
    res.status(404).json({Error: error.message});
  }
};

export const getUserFriends = async(req, res) => {
  try{
    const {userId} = req.params;
    console.log(req.user.id);
    if (userId != req.user.id){
      return res.status(403).json({message: "unauthorized"});
    }
    const user = await User.findById(userId);

    const friends = await Promise.all(
      user.friendsList.map((userId) => User.findById(userId)) //grab all the friends
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, status, location, picturePath}) => {
        return { _id, firstName, lastName, status, location, picturePath}; //update frontend with json format
      });
    res.status(200).json(formattedFriends);
  
    }catch(error){
    res.status(404).json({Error: error.message});
  }
};

 export const addRemoveFriend = async(req, res) => {
  try{
    const {userId, friendId} = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if(user.friendsList.includes(friendId)){
      user.friendsList = user.friendsList.filter((userId) => userId != friendId); //remove the friend from users friendlist
      friend.friendsList = friend.friendsList.filter((userId) => userId != userId); //remove user from friends friendlist
    } 
    else{
      user.friendsList.push(friendId); //add friend to users friendlist
      friend.friendsList.push(userId); //add user to friends friendlist
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friendsList.map((userId) => User.findById(userId)) //grab all the friends
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, status, location, picturePath}) => {
        return { _id, firstName, lastName, status, location, picturePath}; //update the frontend with json format
      });

      res.status(200).json(formattedFriends);

  }catch(error){
    res.status(404).json({Error: error.message});
  }
 }

 export const deleteUser = async(req, res) => {
  try{
    const {userId} = req.params;
    await User.updateMany(
      {},
      {"$pull": {"friendsList": userId}}
    );
    
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(400).json("User not found");
    }
    res.status(200).json("User deleted successfully");

  }catch(error){
    res.status(404).json({Error: error.message});
  }
};


 
