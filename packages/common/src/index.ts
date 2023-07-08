import { ABIInputCodec, HeaderInputCodec } from "@deroll/codec";

export * from "./types";

// application codecs
export const AddMatchCodec = HeaderInputCodec.fromFrameworkMethod(
    "ballaum",
    "AddMatch",
    new ABIInputCodec([
        "string", // tournamentId
        "string", // matchId
        "string", // team1
        "string", // team2
        "uint", // timestamp of the match
    ])
);

export const SetPredictionCodec = HeaderInputCodec.fromFrameworkMethod(
    "ballaum",
    "SetPrediction",
    new ABIInputCodec([
        "string", // tournamentId
        "string", // matchId
        "uint8", // team1Score
        "uint8", // team2Score
    ])
);
export const SetResultCodec = HeaderInputCodec.fromFrameworkMethod(
    "ballaum",
    "SetResult",
    new ABIInputCodec([
        "string", // tournamentId
        "string", // matchId
        "uint8", // team1Score
        "uint8", // team2Score
    ])
);
export const TerminateCodec = HeaderInputCodec.fromFrameworkMethod(
    "ballaum",
    "Terminate",
    new ABIInputCodec(
        ["string"] // tournamentId
    )
);
