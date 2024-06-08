export interface IPost {
    published_at: string | number | Date;
    id: number;
    title: string;
    small_image: Array<{
      id: number;
      mime: string;
      file_name: string;
      url: string;
    }>;
  }