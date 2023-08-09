import { config } from '../../config';
import { defaultProviderFactory } from './default.provider.factory';
import { ganacheProviderFactory } from './ganache.provider.factory';

// It is better using the DI approach instead of deciding which provider is going to be instantiated.
export const provider = config.NODE_ENV === 'test' ? ganacheProviderFactory() : defaultProviderFactory();
