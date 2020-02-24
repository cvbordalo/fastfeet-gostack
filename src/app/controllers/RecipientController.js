import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    // Apenas admin tem acesso ao cadastro de destinatários.
    if (req.acess !== 1) {
      return res
        .status(401)
        .json({ error: 'Registrations allowed for administrators only.' });
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .max(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    if (await Recipient.findOne({ where: { name: req.body.name } })) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .max(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    if (await Recipient.findOne({ where: { name: req.body.name } })) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists.' });
    }

    const { name } = req.body;

    if (name && name !== recipient.name) {
      const recipientExist = await Recipient.findOne({ where: { name } });
      if (recipientExist) {
        res.status(400).json({ error: 'Recipient already exists.' });
      }
    }

    const newRecipient = await recipient.update(req.body);

    return res.json(newRecipient);
  }
}

export default new RecipientController();
