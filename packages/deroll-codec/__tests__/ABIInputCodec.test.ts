import { describe, expect, test } from "@jest/globals";
import { AddressZero } from "@ethersproject/constants";

import { ABIInputCodec, HeaderInputCodec, PackedABIInputCodec } from "../src";

const FRAMEWORK = "framework";
const METHOD = "method";

describe("ABIInputCodec", () => {
    test("packed no header", () => {
        const codec = new PackedABIInputCodec(["address"]);
        const values: any[] = [AddressZero];
        expect(codec.decode(codec.encode(values))).toEqual(values);
    });

    test("packed header", () => {
        const codec = HeaderInputCodec.fromFrameworkMethod(
            FRAMEWORK,
            METHOD,
            new PackedABIInputCodec(["address"])
        );
        const values: any[] = [AddressZero];
        expect(codec.decode(codec.encode(values))).toEqual(values);
    });

    test("unpacked no header", () => {
        const codec = new ABIInputCodec(["address"]);
        const values: any[] = [AddressZero];
        expect(codec.decode(codec.encode(values))).toEqual(values);
    });

    test("unpacked header", () => {
        const codec = HeaderInputCodec.fromFrameworkMethod(
            FRAMEWORK,
            METHOD,
            new ABIInputCodec(["address"])
        );
        const values: any[] = [AddressZero];
        expect(codec.decode(codec.encode(values))).toEqual(values);
    });
});
