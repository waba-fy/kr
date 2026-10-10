import { caseStudies } from '../../data/caseStudiesData';
import { successStories } from '../../data/successStoriesData';
import { clientStories } from '../../data/clientStories';
import { reviews } from '../../data/reviewsData';
const defaults = {
  'case-studies': caseStudies[0], 'success-stories': successStories[0],
  'client-stories': clientStories[0], reviews: reviews[0],
  services: {kind:'service',title:'',desc:'',link:''},
  strategy: {kind:'pillar',title:'',desc:'',link:''},
  products: {kind:'product',title:'',desc:'',link:''},
  about: {kind:'pillar',title:'',desc:''},
  careers: {kind:'culture',title:'',desc:''},
};
export function defaultContentFor(section) { return defaults[section] || {title:'',description:''}; }
