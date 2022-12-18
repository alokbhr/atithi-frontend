import React from "react";

export default function Success({message}) {
  return (
    <div>
      <div className="alert alert-success text-center" role="alert">
        <strong>{message}</strong>
      </div>
      
    </div>
  );
}
