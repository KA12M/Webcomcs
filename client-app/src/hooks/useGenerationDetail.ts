import React, { useState } from "react";

const useGenerationDetail = () => {
  const [formMode, setFormMode] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<string>();

  return { formMode, setFormMode, currentEdit, setCurrentEdit };
};

export default useGenerationDetail;
