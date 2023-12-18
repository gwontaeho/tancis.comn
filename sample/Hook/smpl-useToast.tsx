import { useToast } from '@/comn/hooks'
import { Button } from '@/comn/components'

export const SampleUseToast = () => {
    const toast = useToast()

    const withMessage = () => {
        toast.showToast({ content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' })
    }

    return (
        <div>
            <Button onClick={withMessage}>기본</Button>
        </div>
    )
}
