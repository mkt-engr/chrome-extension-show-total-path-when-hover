import { sampleFunction } from '@src/sampleFunction';
import { findFileNavigation } from './findFileNavigation';

console.log('content script loaded');

// Shows how to call a function defined in another module
// sampleFunction();
findFileNavigation();
