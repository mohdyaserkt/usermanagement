import mongoose, { Document } from 'mongoose';
import { schemas } from '../../database/mongo';

interface User extends Document {
  // Define your user schema fields here
}

const entityName = 'User';

const repository = () => {
  // Schema
  const User = mongoose.model<User>(entityName, schemas.user);

  // Crud executables
  return {
    add: async (user: any) => {
      const mongoObject = new User(user);
      return mongoObject.save();
    },
    countInc: async (userId: string) => {
      return User.findByIdAndUpdate(
        userId,
        {
          $inc: { count: 1 },
          $set: { lastLoginDate: new Date() },
        },
        { new: true }
      );
    },
    update: async (user: any) => {
      const { id, ...updatedData } = user;
      return User.findByIdAndUpdate(
        id,
        { ...updatedData, updatedAt: new Date() },
        { new: true }
      );
    },
    delete: async (user: any) => {
      const { id } = user;
      return User.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
    },
    getByEmail: async (emailId: string) => {
      return User.findOne({ emailId: emailId, deletedAt: { $exists: false } });
    },
    getById: async (id: string) => {
      return User.findOne({ _id: id, deletedAt: { $exists: false } });
    },
    getUsers: async () => {
      return User.aggregate([
        { $match: { role: { $ne: 'admin' } } }, // Match documents where role is not admin
        {
          $project: {
            _id: 1,
            name: 1,
            emailId: 1,
            gender: {
              $cond: {
                if: { $eq: ['$gender', 1] },
                then: 'male',
                else: 'female',
              },
            },
            count: 1,
            lastLoginDate: 1,
          },
        },
      ]);
    },
    getUsersCount: async () => {
       
        
      return User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%B %d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
    
    },
    getTotalUsersCount: async () => {
        return User.aggregate([
            {
                $facet: {
                    totalUserCount: [
                        { $match: { role: 'user' } },
                        { $count: "count" }
                    ],
                    todayLoginCount: [
                        {
                            $match: {
                                role: 'user',
                                lastLoginDate: {
                                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                                    $lt: new Date(new Date().setHours(24, 0, 0, 0))
                                }
                            }
                        },
                        { $count: "count" }
                    ]
                }
            }
        ])
    }
  };
};

export default repository();
