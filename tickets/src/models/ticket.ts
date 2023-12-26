import mongoose, { mongo } from 'mongoose';

// step1: declare attributes required to CREATE a ticket record
interface TicketAttributes {
  title: string;
  price: number;
  userId: string;
}

// step2: declare the properties of the newly created ticket record to mongoose
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// step3: declare the properties of the model for the documents created
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attributes: TicketAttributes): TicketDoc;
}

// step4: build the schema
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

// step5: adapt it to typescript
ticketSchema.statics.build = (attributes: TicketAttributes) => {
  return new Ticket(attributes);
};

// step6: create the model
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

// step7: export the model
export { Ticket };
