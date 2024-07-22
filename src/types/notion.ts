export interface PropertiesType {
  date: {
    id: string;
    type: string;
    date: {
      start: string;
      end: null;
      time_zone: null;
    };
  };
  thumbnail: {
    id: string;
    type: string;
    files: [];
  };
  type: {
    id: string;
    type: string;
    select: {
      id: string;
      name: string;
      color: string;
    };
  };
  slug: {
    id: string;
    type: 'rich_text';
    rich_text: {
      type: string;
      text: {
        content: string;
        link: null;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: null;
    }[];
  };
  category: {
    id: string;
    type: string;
    select: {
      id: string;
      name: string;
      color: string;
    };
  };
  tags: {
    id: string;
    type: 'multi_select';
    multi_select: {
      id: string;
      name: string;
      color: string;
    }[];
  };
  summary: {
    id: string;
    type: 'rich_text';
    rich_text: {
      type: string;
      text: {
        content: string;
        link: null;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text?: string;
      href: null;
    }[];
  };
  updatedAt: {
    id: string;
    type: string;
    last_edited_time: string;
  };
  author: {
    id: string;
    type: string;
    people: {
      object: string;
      id: string;
    }[];
  };
  title: {
    id: string;
    type: string;
    title: {
      type: 'text';
      text: {
        content: string;
        link: null;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: null;
    }[];
  };
  status: {
    id: string;
    type: string;
    select: {
      id: string;
      name: string;
      color: string;
    };
  };
}

export interface DatabaseItemType {
  id: string;
  properties: PropertiesType;
}

export interface TagType {
  id: string;
  name: string;
  color: string;
  description: null | string;
}
