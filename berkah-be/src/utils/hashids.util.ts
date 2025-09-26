import Hashids from "hashids";

export class Hasher {
  private static readonly hashids = new Hashids(
    process.env.HASHID_SALT || "secret-salt",
    10
  );

  static encode(id: string): string {
    if (!id) {
      throw new Error("Invalid ID passed to encode method");
    }
    
    return this.hashids.encodeHex(id.replace(/-/g, ""));
  }

  static decode(hash: string): string {
    const decodedHex = this.hashids.decodeHex(hash);
    if (!decodedHex) return "";

    return decodedHex.replace(
      /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
      "$1-$2-$3-$4-$5"
    );
  }
}
