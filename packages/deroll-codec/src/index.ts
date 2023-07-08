import { ABIInputCodec, PackedABIInputCodec, HeaderInputCodec } from "./codec";

export * from "./addressBook";
export * from "./codec";
export * from "./unpack";

// wallet codecs
export const EtherDepositCodec = new PackedABIInputCodec([
    "address",
    "uint256",
    "bytes",
]);
export const EtherWithdrawCodec = HeaderInputCodec.fromFrameworkMethod(
    "wallet",
    "EtherWithdraw",
    new PackedABIInputCodec(["uint256", "bytes"])
);
export const ERC20DepositCodec = new PackedABIInputCodec([
    "bool",
    "address",
    "address",
    "uint256",
    "bytes",
]);
export const ERC20WithdrawCodec = HeaderInputCodec.fromFrameworkMethod(
    "wallet",
    "ERC20_Withdraw",
    new PackedABIInputCodec(["address", "uint256", "bytes"])
);

// relay codecs
export const DAppAddressRelayCodec = new PackedABIInputCodec(["address"]);
