export default interface Istore {
  _id: {
    $oid: string;
  };
  nameStore: {
    type: string;
    required: true;
  };
  typeStore: {
    type: string;
    required: true;
  };
  whatsapp: {
    type: number;
    required: true;
  };
  timestamps: true;
}
