import React from "react";

export default function Error({message}) {
  return (
    <div>
      <div className="alert alert-danger text-center" role="alert">
        <strong>{message}</strong>
      </div>
    </div>
  );
}
