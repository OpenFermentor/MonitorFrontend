import immutablePersistenceTransform from './immutable_persistence_transform'

const persistConfig = {
  transforms: [
    immutablePersistenceTransform
  ],
  blacklist: [
    'sensors'
  ]
}

export default persistConfig
