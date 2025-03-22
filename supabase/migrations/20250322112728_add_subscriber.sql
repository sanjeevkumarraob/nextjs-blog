-- Create a function with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.add_subscriber(subscriber_email TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  existing_subscriber uuid;
BEGIN
  -- Check if email already exists
  SELECT id INTO existing_subscriber 
  FROM public.subscribers 
  WHERE email = subscriber_email;
  
  IF existing_subscriber IS NOT NULL THEN
    -- Return the existing subscriber
    SELECT to_json(subscribers.*) INTO result
    FROM public.subscribers
    WHERE email = subscriber_email;
    
    RETURN json_build_object(
      'data', result,
      'already_exists', true
    );
  END IF;
  
  -- Insert new subscriber
  INSERT INTO public.subscribers (email)
  VALUES (subscriber_email)
  RETURNING to_json(subscribers.*) INTO result;
  
  RETURN json_build_object(
    'data', result,
    'already_exists', false
  );
END;
$$;

-- Allow anyone to call this function
GRANT EXECUTE ON FUNCTION public.add_subscriber TO public;