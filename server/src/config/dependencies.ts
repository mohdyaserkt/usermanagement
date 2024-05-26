import useCases from '../useCases';
import * as repositories from '../frameworks/repositories/mongo';

export default {
    useCases,
    ...repositories
};
