// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

// async function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3,
//   };
//   try{
//   let waiting = await dbs.db1(id);
//   console.log(waiting);
//   }catch{
//     console.log(err);
//   }
//   console.log(dbs.db1(id));
  // Promise.any([dbs.db1(id), dbs.db2(id), dbs.db3(id)])
  //   .then((x) => {
  //     console.log(x);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
//   Promise.resolve(dbs.db1(id))
//     .then((x) => {
//       console.log(x);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }


// vault:

// async function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3,
//   };
//   Promise.all([vault(id)])
//     .then((x) => {
//       console.log(x);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }


// central:
async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  let waiting = await central(id);
  console.log(waiting);
  Promise.any([central(id)])
    .then((x) => {
      console.log(x);
    })
    .catch((err) => {
      console.error(err);
    });
    Promise.resolve()
}

getUserData(1);

// {
//   id: number,
//   name: string,
//   username: string,
//   email: string,
//   address: {
//     street: string,
//     suite: string,
//     city: string,
//     zipcode: string,
//     geo: {
//       lat: string,
//       lng: string
//     }
//   },
//   phone: string,
//   website: string,
//   company: {
//     name: string,
//     catchPhrase: string,
//     bs: string
//   }
// }


async function getUserData1 (id) {
  try {
      const centralDB = await central(id);
      const userData = await dbs[centralDB](id);
      const userAddress = await vault(id);

      return {
          id: id,
          name: userAddress.name,
          username: userData.username,
          email: userAddress.email,
          address: {
              street: userAddress.address.street,
              suite: userAddress.address.suite,
              city: userAddress.address.city,
              zipcode: userAddress.address.zipcode,
              geo: {
                  lat: userAddress.address.geo.lat,
                  lng: userAddress.address.geo.lng
              }
          },
          phone: userAddress.phone,
          website: userData.website,
          company: {
              name: userData.company.name,
              catchPhrase: userData.company.catchPhrase,
              bs: userData.company.bs
          }
      };
  } catch (error) {
      return Promise.reject(error);
  }
}
getUserData1(5)
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));

getUserData1(15)
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));



//Part 2: The Implementation

    async function getUserData2(id) {
      try {
          const centralDBPromise = central(id);
          const userDataPromise = centralDBPromise.then(centralDB => dbs[centralDB](id));
          const userAddressPromise = vault(id);
  
          const [centralDB, userData, userAddress] = await Promise.all([centralDBPromise, userDataPromise, userAddressPromise]);
  
          return {
              id: id,
              name: userAddress.name,
              username: userData.username,
              email: userAddress.email,
              address: {
                  street: userAddress.address.street,
                  suite: userAddress.address.suite,
                  city: userAddress.address.city,
                  zipcode: userAddress.address.zipcode,
                  geo: {
                      lat: userAddress.address.geo.lat,
                      lng: userAddress.address.geo.lng
                  }
              },
              phone: userAddress.phone,
              website: userData.website,
              company: {
                  name: userData.company.name,
                  catchPhrase: userData.company.catchPhrase,
                  bs: userData.company.bs
              }
          };
      } catch (error) {
          return Promise.reject(error);
      }
  }
  

  function getUserData(id) {
    return central(id)
        .then(centralDB => {
            return Promise.all([
                dbs[centralDB](id),
                vault(id)
            ]);
        })
        .then(([userData, userAddress]) => {
            return {
                id: id,
                name: userAddress.name,
                username: userData.username,
                email: userAddress.email,
                address: {
                    street: userAddress.address.street,
                    suite: userAddress.address.suite,
                    city: userAddress.address.city,
                    zipcode: userAddress.address.zipcode,
                    geo: {
                        lat: userAddress.address.geo.lat,
                        lng: userAddress.address.geo.lng
                    }
                },
                phone: userAddress.phone,
                website: userData.website,
                company: {
                    name: userData.company.name,
                    catchPhrase: userData.company.catchPhrase,
                    bs: userData.company.bs
                }
            };
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

