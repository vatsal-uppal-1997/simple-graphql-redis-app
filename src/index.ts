import mongoose from 'mongoose'
import server from './graphql'

import config from './config/config.json'

const PORT = process.env.PORT || 8080


mongoose
  .connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then( () => {
    server
      .listen(PORT)
      .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
      })
      .catch(err => {
        console.log('An error occurred while setting up the server')
        console.log(err)
      })
  })
  .catch( (err) => {
    console.log('Some error occurred while connecting to mongo')
    console.log(err)
  })

