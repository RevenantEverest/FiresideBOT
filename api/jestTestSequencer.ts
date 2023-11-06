import type { Test } from '@jest/test-result';
import Sequencer from '@jest/test-sequencer';

class CustomSequencer extends Sequencer {
    sort(tests: Test[]): Test[] {
        // Test structure information
        // https://github.com/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
        const copyTests = Array.from(tests);
        return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
    };
};

export default CustomSequencer;