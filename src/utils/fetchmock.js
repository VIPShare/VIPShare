import FetchMock from 'react-native-fetch-mock';

global.fetch = new FetchMock(require('../../__mocks__')).fetch;
