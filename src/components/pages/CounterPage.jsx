import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";

const CounterPage = () => {
  const [countInput, setCountInput] = useState(0);
  const countSelector = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const incrementCount = () => {
    dispatch({
      type: "INCREMENT_COUNTER",
    });
  };

  const decrementCount = () => {
    dispatch({
      type: "DECREMENT_COUNTER",
    });
  };

  const setCountWithInput = () => {
    dispatch({
      type: "SET_COUNT",
      payload: countInput,
    });
  };

  return (
    <main className="min-h-[80vh] max-w-screen-md mx-auto flex flex-col justify-center items-center gap-4">
      <p className="text-5xl font-bold">Count : {countSelector.count}</p>

      <div className="flex items-center gap-4">
        <Button size="icon" onClick={decrementCount}>
          <Minus className="h-6 w-6" />
        </Button>

        <Button size="icon" onClick={incrementCount}>
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex gap-2 mt-8">
        <Input type="number" onChange={(e) => setCountInput(e.target.value)} />
        <Button type="submit" onClick={setCountWithInput}>
          Submit
        </Button>
      </div>
    </main>
  );
};

export default CounterPage;
