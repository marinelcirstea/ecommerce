const getUsers = () => {
  /**
  [TODO]
  Create platform employee values for User model
  
  something like this?
  UserModel{
      ... normal user data ...

    isPlatformEmployee: {type:Boolean, default:false}
    employeeRights:{
        users:{
            view:{type:Boolean, default:false},
            update:{type:Boolean, default:false},
            delete:{type:Boolean, default:false},
        },
        stores:{
            view:{type:Boolean, default:false},
            update:{type:Boolean, default:false},
            delete:{type:Boolean, default:false},
        }
    }
  }

  const session = res.locals.session // guaranteed due to auth middleware

  const user = await User.findOne({_id:session.userId})


    if(!user.isPlatformEmployee || !user.employeeRights.users.view){
        throw new CustomError("Unauthorized!", 403)
    }

    










   */
};

export default getUsers;
