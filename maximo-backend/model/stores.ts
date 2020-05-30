export default interface Istore {
  _id: {
    $oid: string;
  };
  nameStore: string;
  typeStore: string;
  whatsapp: string;
  timestamps: true;
}
