"use strict";

const r1 = "8" + 2;
console.log('1)', r1, typeof r1);

const r2 = "8" - 2;
console.log('2)', r2, typeof r2);

const r3 = Number("8") + 2;
console.log('3)', r3, typeof r3);

const r4 = "12" > "3";
console.log('4)', r4, typeof r4);

const r5 = 12 === "12";
console.log('5)', r5, typeof r5);

const r6 = Number("");
console.log('6)', r6, typeof r6);

const r7 = Number("text");
console.log('7)', r7, typeof r7);

const r8 = Boolean("false");
console.log('8)', r8, typeof r8);

const r9 = typeof null;
console.log('9)', r9, typeof r9);

const r10 = typeof NaN;
console.log('10)', r10, typeof r10);