import React from "react"
import { render, fireEvent } from "@testing-library/react-native"

import { MyButton } from "./Button"

describe("<MyButton />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<MyButton title="Test!" onPress={() => {}} />)

    expect(toJSON()).toMatchSnapshot()
  })

  it("triggers the given onPress method", () => {
    const onPressMock = jest.fn()

    const { getByText } = render(
      <MyButton title="Test!" onPress={onPressMock} />
    )
    fireEvent(getByText("Test!"), "onPressOut")

    expect(onPressMock).toHaveBeenCalled()
  })
})
