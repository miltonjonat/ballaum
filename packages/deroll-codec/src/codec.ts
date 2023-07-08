import { defaultAbiCoder, ParamType, Result } from "@ethersproject/abi";
import { toUtf8Bytes } from "@ethersproject/strings";
import { keccak256 } from "@ethersproject/keccak256";
import { pack } from "@ethersproject/solidity";
import { unpack } from "./unpack";

export interface InputCodec<E, D> {
    encode(value: E): string;
    decode(payload: string): D;
}

export class ABIInputCodec implements InputCodec<string[], Result> {
    public readonly types: string[];
    public readonly header?: string;

    constructor(types: string[]) {
        this.types = types;
    }

    _encode(types: string[], values: any[]): string {
        return defaultAbiCoder.encode(types, values);
    }

    _decode(types: string[], payload: string): Result {
        return defaultAbiCoder.decode(types, payload);
    }

    public encode(values: any[]): string {
        return this._encode(this.types, values);
    }

    public decode(payload: string): Result {
        return this._decode(this.types, payload);
    }
}

export class PackedABIInputCodec extends ABIInputCodec {
    constructor(types: string[]) {
        super(types);
    }

    _encode(types: string[], values: any[]): string {
        return pack(types, values);
    }

    _decode(types: string[], payload: string): Result {
        return unpack(types, payload);
    }
}

export class HeaderInputCodec implements InputCodec<string[], Result> {
    public readonly header: string;
    public readonly headerType: string;
    public readonly codec: ABIInputCodec;

    constructor(header: string, headerType: string, codec: ABIInputCodec) {
        this.header = header;
        this.headerType = headerType;
        this.codec = codec;
    }

    public static fromFrameworkMethod(
        framework: string,
        method: string,
        codec: ABIInputCodec
    ): HeaderInputCodec {
        const header = keccak256(
            toUtf8Bytes(
                keccak256(toUtf8Bytes(framework)) +
                    keccak256(toUtf8Bytes(method))
            )
        );
        return new HeaderInputCodec(header, "bytes32", codec);
    }

    public encode(values: any[]): string {
        const types = [this.headerType, ...this.codec.types];
        return this.codec._encode(types, [this.header, ...values]);
    }

    public decode(payload: string): Result {
        const types = [this.headerType, ...this.codec.types];
        const [_header, ...result] = this.codec._decode(types, payload);
        return result;
    }
}
