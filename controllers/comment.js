const Comment = require('../models/comment')
const Motor = require('../models/motor')

module.exports.store = async (req, res) => {
    const {motor_id} = req.params
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    await comment.save();
    const motor = await Motor.findById(motor_id);
    motor.comments.push(comment);
    await motor.save()
    const msg = req.flash('success_msg','anda berhasil menambahkan komentar')
    res.json({ message: 'Success add comment', motor });
}
module.exports.destroy = async (req, res) => {
    const { motor_id, comment_id } = req.params;
      try {
      const motor = await Motor.findById(motor_id);
    if (!motor) {
        return res.status(404).json({ error: 'Motor tidak ditemukan' });
      }
        const comment = motor.comments.find(comment => comment._id.equals(comment_id));
    if (!comment) {
        return res.status(404).json({ error: 'Komentar tidak ditemukan' });
      }
      await Comment.findByIdAndDelete(comment_id);
      motor.comments.pull({ _id: comment_id });
      await motor.save();
      const msg = req.flash('success_msg', 'Komentar berhasil dihapus');
      res.json({ message: 'Berhasil menghapus komentar', success_msg: msg });
    } catch (error) {
      console.error('Error menghapus komentar:', error.message);
      res.status(500).json({ error: 'Error Server Internal' });
    }
  };