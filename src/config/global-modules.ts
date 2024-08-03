import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

export const cacheModule = CacheModule.registerAsync({
  isGlobal: true,
  useFactory: async () => ({
    store: await redisStore({
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
  }),
})

export const globalModules = [cacheModule]
