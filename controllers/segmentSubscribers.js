const jwt= require("jsonwebtoken");
const User= require("../model/userAuth");
const mongoose =require("mongoose")
const moment =require("moment")


require("dotenv").config()

const getSegmentSubscriber= async(req,res)=>{
try {
  // console.log(req.body)
  const userId= req.params.id
  const filterConditions= req.body.filterCondition;
if(!userId){
  return res.status(404).json({msg:"no user found"})
} 

  const buildSubscriberFilterQuery = (filters) => {
    return filters.map(filter => {
        const { field, operator, value, value2 } = filter;

        if (operator === "contains") {
            return {
                $regexMatch: {
                    input: `$$contact.${field}`,
                    regex: value,
                    options: "i"
                }
            };
        }

        if (operator === "does-not-contains") {
            return {
                $not: {
                    $regexMatch: {
                        input: `$$contact.${field}`,
                        regex: value,
                        options: "i"
                    }
                }
            };
        }

        if (operator === "isBefore") {
            const cutoffDate = moment
                .utc(value)
                .startOf("day")
                .toDate();

            return {
                $lt: [`$$contact.${field}`, cutoffDate]
            };
        }

        if (operator === "isAt") {
            const startDate = moment
                .utc(value)
                .startOf("day")
                .toDate();

            const endDate = moment
                .utc(value)
                .endOf("day")
                .toDate();

            return {
                $and: [
                    {
                        $gte: [`$$contact.${field}`, startDate]
                    },
                    {
                        $lte: [`$$contact.${field}`, endDate]
                    }
                ]
            };
        }

        if (operator === "isAfter") {
            const cutoffDate = moment
                .utc(value)
                .endOf("day")
                .toDate();

            return {
                $gt: [`$$contact.${field}`, cutoffDate]
            };
        }

        if (operator === "isBetween") {
            const startDate = moment
                .utc(value)
                .startOf("day")
                .toDate();

            const endDate = moment
                .utc(value2)
                .endOf("day")
                .toDate();

            return {
                $and: [
                    {
                        $gte: [`$$contact.${field}`, startDate]
                    },
                    {
                        $lte: [`$$contact.${field}`, endDate]
                    }
                ]
            };
        }

        if (operator === "isInTheLast") {
            const cutoffDate = moment
                .utc()
                .subtract(parseInt(value), value2)
                .toDate();

            return {
                $gte: [`$$contact.${field}`, cutoffDate]
            };
        }

        if (operator === "is") {
            return {
                $eq: [`$$contact.${field}`, value]
            };
        }

        if (operator === "is not") {
            return {
                $not: {
                    $eq: [`$$contact.${field}`, value]
                }
            };
        }

        if (operator === "equals") {
            return {
                $eq: [
                    `$$contact.${field}`,
                    parseInt(value)
                ]
            };
        }

        if (operator === "isLessThan") {
            return {
                $lt: [
                    `$$contact.${field}`,
                    parseInt(value)
                ]
            };
        }

        if (operator === "isLessThanOrEqual") {
            return {
                $lte: [
                    `$$contact.${field}`,
                    parseInt(value)
                ]
            };
        }

        if (operator === "isGreaterThan") {
            return {
                $gt: [
                    `$$contact.${field}`,
                    parseInt(value)
                ]
            };
        }

        if (operator === "isGreaterThanOrEqual") {
            return {
                $gte: [
                    `$$contact.${field}`,
                    parseInt(value)
                ]
            };
        }

        return {};
    });
};


// this one worked
  // const buildAggregationFilter = (conditions) => {
  //   return conditions.map(condition => {
  //     const { type, filters } = condition;
  //     const mongoFilters = buildSubscriberFilterQuery(filters);
  
  //     if (type === 'AND') {
  //       return { $and: mongoFilters };
  //     } else if (type === 'OR') {
  //       return { $or: mongoFilters };
  //     }
  //   });
  // };
   const buildAggregationFilter = (segments) => {
    return segments.map(segment => {
        const conditions = buildSubscriberFilterQuery(segment.filters);

        if (conditions.length === 1) {
            return conditions[0];  
        }

        return {
            $and: conditions
        };
    });
};

  const ObjectId = mongoose.Types.ObjectId;
  // const result = await User.aggregate([
   
  const aggregationPipeline = [
    {
        $match: { _id: new ObjectId(userId) }
      
    },
    {
      $project: {
        name: 1, // Return other user fields as needed
        contacts: {
          $filter: {
            input: "$contacts",
            as: "contact",
            cond: {
              $or: buildAggregationFilter(filterConditions)
            }
          }
        }
      }
    }
  ];
  const result = await User.aggregate(aggregationPipeline).exec();
  // console.log(result);
// console.log(result[0].contacts)
res.status(200).json({result:result[0].contacts})

} catch (error) {
  console.log(error);
  res.status(403).send(error)
}

};

module.exports= {getSegmentSubscriber}



// const userId = 'user_id'; // Replace with the actual user ID
// const filterConditions = [
//   {
//     type: "OR",
//     filters: [
//       { field: "dateJoined", operator: "last", value: 5, value2: "days" },
//       { field: "email", operator: "contains", value: "@gmail.com" },
//       { field: "email", operator: "does not contains", value: "@yandex" },
//     ]
//   },
//   {
//     type: "OR",
//     filters: [
//       { field: "dateJoined", operator: "is before", value: 986227227727},
//       { field: "email", operator: "contains", value: "@gmail.com" },
//       { field: "email", operator: "does not contains", value: "@yandex" },
//     ]
//   },
// ];

// [
//   {
//     _id:8272722278222,
//     name:"muhammad",
//     email:"dn@g.com",
//     subscribers:[
//       {
//         name:"user",
//         email:"daniel@xample.com",
//         dateJoined:226222672
//       },
//       {
//         name:"user2",
//         email:"daniel2@xample.com",
//         dateJoined:6546222672
//       },
//       {
//         name:"user3",
//         email:"daniel3@xample.com",
//         dateJoined:226222672
//       },
//     ]
//   }, {
//     _id:3456664,
//     name:"umar",
//     email:"dansn@g.com",
//     subscribers:[
//       {
//         name:"user",
//         email:"daniel@xample.com",
//         dateJoined:226222672
//       },
//       {
//         name:"user2",
//         email:"daniel2@xample.com",
//         dateJoined:6546222672
//       },
//       {
//         name:"user3",
//         email:"daniel3@xample.com",
//         dateJoined:226222672
//       },
//     ]
//   }
// ]

// Execute the aggregation pipeline


