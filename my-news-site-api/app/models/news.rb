class News < ApplicationRecord
  mount_uploader :image, ImageUploader

  after_initialize :set_defaults

  private
  def set_defaults
    self.hidden ||= false
  end
end
